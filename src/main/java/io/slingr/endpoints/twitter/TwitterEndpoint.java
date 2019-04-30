package io.slingr.endpoints.twitter;

import io.slingr.endpoints.HttpPerUserEndpoint;
import io.slingr.endpoints.exceptions.EndpointException;
import io.slingr.endpoints.exceptions.ErrorCode;
import io.slingr.endpoints.framework.annotations.*;
import io.slingr.endpoints.services.AppLogs;
import io.slingr.endpoints.services.exchange.Parameter;
import io.slingr.endpoints.services.exchange.ReservedName;
import io.slingr.endpoints.services.rest.DownloadedFile;
import io.slingr.endpoints.services.rest.RestClient;
import io.slingr.endpoints.utils.Json;
import io.slingr.endpoints.utils.Strings;
import io.slingr.endpoints.ws.exchange.FunctionRequest;
import io.slingr.endpoints.ws.exchange.WebServiceResponse;
import org.apache.commons.codec.binary.Base64;
import org.apache.commons.lang.StringUtils;
import org.apache.http.entity.ContentType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.crypto.Mac;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.*;

/**
 * Twitter endpoint
 *
 * <p>Created by egonzalez on 05/16/17.
 */
@SlingrEndpoint(name = "twitter", functionPrefix = "_")
public class TwitterEndpoint extends HttpPerUserEndpoint {

    private static final Logger logger = LoggerFactory.getLogger(TwitterEndpoint.class);

    @ApplicationLogger
    private AppLogs appLogger;

    @EndpointProperty
    private String apiKey;

    @EndpointProperty
    private String apiSecret;

    private String appAccessToken;

    @Override
    public String getApiUri() {
        return "https://api.twitter.com";
    }

    public String getUploadApiUri() {
        return "https://upload.twitter.com";
    }

    @Override
    public void endpointStarted() {
        try {
            doAppLogin();
        } catch(Exception e) {
            //do nothing
        }
        httpService().setAllowExternalUrl(true);
    }

    //Auth process

    @EndpointWebService(path = "authCallback")
    public WebServiceResponse authCallback() {
        return new WebServiceResponse("<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\" \"http://www.w3.org/TR/html4/loose.dtd\">\n" +
                "<html>\n" +
                "<head>\n" +
                "<title>Twitter authentication</title>\n" +
                "</head>\n" +
                "<body>\n" +
                "</body>\n" +
                "</html>", ContentType.TEXT_HTML.toString());
    }

    @EndpointFunction(name = "preConnectUser")
    public Json preConnectUser(FunctionRequest request) {
        String oauthCallback = properties().getWebServicesUri().concat("/authCallback");
        String url = getApiUri()+"/oauth/request_token?oauth_callback="+encode(oauthCallback);
        Map<String, String> headers = new HashMap<>();
        headers.put("oauth_callback", encode(oauthCallback));
        Json res = RestClient.builder(url).header("Authorization", getOauthHeader("POST", url, headers, apiSecret+"&", false)).post();
        String body = res.string("body");
        int tokenIndex = body.indexOf("oauth_token=") + 12;
        int secretIndex = body.indexOf("oauth_token_secret=") + 19;
        return Json.map().set("oauth_token", body.substring(tokenIndex, secretIndex-20)).set("oauth_token_secret", body.substring(secretIndex, body.indexOf("&", secretIndex)));
    }

    @EndpointFunction(name = ReservedName.CONNECT_USER)
    public Json connectUser(FunctionRequest request) {
        final String userId = request.getUserId();
        if(StringUtils.isNotBlank(userId)) {
            // checks if the user includes a non-empty 'code' on the request
            final Json jsonBody = request.getJsonParams();
            if (jsonBody != null && StringUtils.isNotBlank(jsonBody.string("token"))) {
                String token = jsonBody.string("token");
                String verifier = jsonBody.string("verifier");
                String url = getApiUri()+"/oauth/access_token?oauth_verifier="+encode(verifier);

                Map<String, String> headers = new HashMap<>();
                headers.put("oauth_token", encode(token));
                Json res = RestClient.builder(url).header("Authorization", getOauthHeader("POST", url, headers, apiSecret+"&", false)).post();
                String body = res.string("body");
                int tokenIndex = body.indexOf("oauth_token=") + 12;
                int secretIndex = body.indexOf("oauth_token_secret=") + 19;
                Json userConfig = Json.map().set("oauth_token", body.substring(tokenIndex, secretIndex-20)).set("oauth_token_secret", body.substring(secretIndex, body.indexOf("&", secretIndex)));
                if (userConfig.contains("oauth_token")) {
                    // saves the information on the users data store
                    Json conf = users().save(userId, userConfig);
                    logger.info(String.format("User connected [%s] [%s]", userId, conf.toString()));

                    // sends connected user event
                    users().sendUserConnectedEvent(request.getFunctionId(), userId, conf);

                    return conf;
                } else {
                    logger.warn(String.format("Problems trying to connect user [%s] to Slack: %s", userId, res.toString()));
                    appLogger.warn(String.format("Problems trying to connect user [%s] to Slack: %s", userId, res.string("error")));
                }
            } else {
                logger.info(String.format("Empty 'code' when try to connect user [%s] [%s]", userId, request.toString()));
            }
        }
        defaultMethodDisconnectUsers(request);
        return Json.map();
    }

    //Functions


    @EndpointFunction(name = "_appGet")
    public Json appGet(FunctionRequest request) {
        if (appAccessToken == null) {
            doAppLogin();
        }
        setAppRequestHeaders(request);
        return defaultGetRequest(request);
    }


    @EndpointFunction(name = "_get")
    public Json userGet(FunctionRequest request) {
        try {
            setUserRequestHeaders("GET", request);
            return defaultGetRequest(request);
        } catch (EndpointException restException) {
            if (restException.getCode() == ErrorCode.CLIENT) {
                users().sendUserDisconnectedEvent(request.getUserId());
            }
            throw restException;
        }
    }

    @EndpointFunction(name = "_post")
    public Json userPost(FunctionRequest request) {
        try {
            setUserRequestHeaders("POST", request);
            return defaultPostRequest(request);
        } catch (EndpointException restException) {
            if (restException.getCode() == ErrorCode.CLIENT) {
                users().sendUserDisconnectedEvent(request.getUserId());
            }
            throw restException;
        }
    }

    @EndpointFunction(name = "_uploadMedia")
    public Json uploadMedia(FunctionRequest request) {
        try {
            setUserRequestHeaders("POST", getUploadApiUri(), request);
            Json requestJson = request.getJsonParams();
            RestClient client = RestClient.builder(getUploadApiUri());
            if (!requestJson.isEmpty("multipart") && requestJson.bool("multipart")) {
                return client.httpMultipart(requestJson, files());
            } else {
                return client.httpPost(requestJson);
            }
        } catch (EndpointException restException) {
            if (restException.getCode() == ErrorCode.CLIENT) {
                users().sendUserDisconnectedEvent(request.getUserId());
            }
            throw restException;
        }
    }

    @EndpointFunction(name = "_uploadStatus")
    public Json uploadStatus(FunctionRequest request) {
        try {
            setUserRequestHeaders("GET", getUploadApiUri(), request);
            Json requestJson = request.getJsonParams();
            RestClient client = RestClient.builder(getUploadApiUri());
            return client.httpGet(requestJson);
        } catch (EndpointException restException) {
            if (restException.getCode() == ErrorCode.CLIENT) {
                users().sendUserDisconnectedEvent(request.getUserId());
            }
            throw restException;
        }
    }

    //helpers

    private String getOauthHeader(String method, String url, Map<String, String> headers, String secretKey, boolean includeParams) {
        if (headers == null) {
            headers = new HashMap<>();
        }
        headers.put("oauth_consumer_key", apiKey);
        headers.put("oauth_signature_method", "HMAC-SHA1");
        headers.put("oauth_nonce", Strings.randomUUIDString().replaceAll("-", ""));
        headers.put("oauth_timestamp", Long.toString(System.currentTimeMillis() / 1000L));
        headers.put("oauth_version", "1.0");
        Map<String, String> otherParams = new HashMap<>();
        String cleanUrl = url;
        if (url.contains("?")) {
            int i = url.indexOf("?");
            cleanUrl = url.substring(0, i);
            if (includeParams) {
                String[] params = url.substring(i+1).split("&");
                for (String param : params) {
                    String[] p = param.split("=");
                    if (p.length == 2) {
                        otherParams.put(p[0], p[1]);
                    }
                }
            }
        }
        Map<String, String> complete = new HashMap<>(headers);
        if (!otherParams.isEmpty()) {
            complete.putAll(otherParams);
        }
        List<String> keys = new ArrayList<>(complete.keySet());
        Collections.sort(keys);
        String parameterString = "";
        String prefix = "";
        for (String key : keys) {
            parameterString = parameterString.concat(prefix).concat(key).concat("=").concat(complete.get(key));
            prefix = "&";
        }
        String baseString = method+"&"+encode(cleanUrl)+"&" + encode(parameterString);
        String signature = computeSignature(baseString, secretKey);
        String authHeader = "OAuth ";
        prefix = "";
        for (String key : headers.keySet()) {
            authHeader = authHeader.concat(prefix).concat(key).concat("=\"").concat(headers.get(key)).concat("\"");
            prefix = ",";
        }
        authHeader += ",oauth_signature=\"" + encode(signature) + "\"";
        return authHeader;
    }

    private String encode(String value) {
        String encoded = null;
        try {
            encoded = URLEncoder.encode(value, "UTF-8");
        } catch (UnsupportedEncodingException ignore) {
        }
        if (encoded != null) {
            StringBuilder buf = new StringBuilder(encoded.length());
            char focus;
            for (int i = 0; i < encoded.length(); i++) {
                focus = encoded.charAt(i);
                if (focus == '*') {
                    buf.append("%2A");
                } else if (focus == '+') {
                    buf.append("%20");
                } else if (focus == '%'
                        && (i + 1) < encoded.length()
                        && encoded.charAt(i + 1) == '7'
                        && (i + 2) < encoded.length()
                        && encoded.charAt(i + 2) == 'E') {
                    buf.append('~');
                    i += 2;
                } else {
                    buf.append(focus);
                }
            }
            return buf.toString();
        }
        return "";
    }

    private static String computeSignature(String baseString, String keyString) {

        SecretKey secretKey;

        byte[] keyBytes = keyString.getBytes();
        secretKey = new SecretKeySpec(keyBytes, "HmacSHA1");

        Mac mac = null;
        try {
            mac = Mac.getInstance("HmacSHA1");
            mac.init(secretKey);
        } catch (NoSuchAlgorithmException | InvalidKeyException e) {
            // do nothing
        }

        if (mac != null) {
            byte[] text = baseString.getBytes();

            return new String(Base64.encodeBase64(mac.doFinal(text))).trim();
        }

        return null;

    }

    private void doAppLogin() {
        appLogger.info(String.format("Logging in with app [%s]", apiKey));
        Json response = RestClient.builder(getApiUri().concat("/oauth2/token?grant_type=client_credentials"))
                .basicAuthentication(apiKey, apiSecret).post();
        appAccessToken = !response.isEmpty("access_token") ? response.string("access_token") : null;
        appLogger.info(String.format("Successfully logged in into with user [%s]", apiKey));
    }

    // Internal methods

    private void setAppRequestHeaders(FunctionRequest request) {
        Json body = request.getJsonParams();
        Json headers = body.json("headers");
        if (headers == null) {
            headers = Json.map();
        }
        headers.set("Authorization", "Bearer " + appAccessToken);
        headers.set("Content-Type", "application/json");
        body.set("headers", headers);
    }

    private void setUserRequestHeaders(String method, FunctionRequest request) {
        setUserRequestHeaders(method, getApiUri(), request);
    }

    private void setUserRequestHeaders(String method, String mainUrl, FunctionRequest request) {
        Json userConfig = users().findById(request.getUserId());
        if (userConfig == null || userConfig.isEmpty("oauth_token")) {
            throw EndpointException.permanent(ErrorCode.API, String.format("User [%s] is not connected", request.getUserEmail())).returnCode(401);
        }
        Json body = request.getJsonParams();
        String token = userConfig.string("oauth_token");
        String secret = userConfig.string("oauth_token_secret");
        if (StringUtils.isBlank(token) || StringUtils.isBlank(secret)) {
            users().sendUserDisconnectedEvent(request.getUserId());
            return;
        }
        Json headers = body.json("headers");
        if (headers == null) {
            headers = Json.map();
        }
        Map<String, String> otherHeaders = new HashMap<>();
        otherHeaders.put("oauth_token", encode(token));
        headers.set("Authorization", getOauthHeader(method, getTargetUrl(request, mainUrl), otherHeaders, apiSecret.concat("&").concat(encode(secret)), true));
        headers.set("Content-Type", "application/json");
        body.set("headers", headers);
    }

    private String getTargetUrl(FunctionRequest request, String mainUrl) {
        StringBuilder url = new StringBuilder(mainUrl);
        Json json = request.getJsonParams();
        if (json != null) {
            if (!json.isEmpty("path")) {
                url.append(json.string("path"));
            }
            if (!json.isEmpty("params")) {
                Map<String, Object> params = json.json("params").toMap();
                String prefix = url.toString().contains("?") ? "&" : "?";
                for (String key : params.keySet()) {
                    url.append(prefix.concat(key).concat("=").concat(encode(params.get(key).toString())));
                    prefix = "&";
                }
            }
        }
        return url.toString();
    }

}

