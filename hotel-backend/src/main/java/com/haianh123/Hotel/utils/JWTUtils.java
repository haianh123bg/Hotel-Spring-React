package com.haianh123.Hotel.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwt;
import io.jsonwebtoken.Jwts;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Date;
import java.util.function.Function;

@Service
public class JWTUtils {
    private static final long EXPIRATION_TIME = 1000 * 60 * 24 * 7; //for 7 days

    private final SecretKey key;

    public JWTUtils() {
        String secreteString = "f4d16e71bd5ce67a637795b939870dae19cba1b61bdddf6215f4498e8447b3c7de900d1a9a5756a57219dd2f9c3390bae8286cb3ed2b18c24f915d38e312eb896b1b8897bc95d0e1ac26c9930774c50dbe67583ff960bd48f43e87921dcffe71730fbab6382114dc3b27733aad404a589529a530d2a9283e5162a37e68025a36fed6cafb4212182f802fb887d3f14014d59eeffb56b7b4293f14a2e59148db74dbdc34ea573afe54a236160bc65d818daff78d1875e0ae33e7e5ed7bc896cb4c67953cd936d953e463cc7f02c017eeb18e4d22a7b1136a5be271327a26f6d71bd5de4048bceccedd42b1dbfaf986257f5cb0e111270c25479ee5751895d06a14";
        byte[] keyBytes = Base64.getDecoder().decode(secreteString.getBytes(StandardCharsets.UTF_8));
        this.key = new SecretKeySpec(keyBytes, "HmacSHA256");
    }

    public String gennerateToken(UserDetails userDetails){
        return Jwts.builder()
                .subject(userDetails.getUsername())
                .issuedAt(new Date((System.currentTimeMillis())))
                .expiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(key)
                .compact();
    }
    
    public String extractUsername(String token) {
        return extractClaims(token, Claims::getSubject);
    }

    private <T> T extractClaims(String token, Function<Claims, T> claimsFunction) {
        return claimsFunction.apply(Jwts.parser().verifyWith(key).build().parseSignedClaims(token).getPayload());
    }

    public boolean isValidToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    private boolean isTokenExpired(String token) {
        return extractClaims(token, Claims::getExpiration).before(new Date());
    }


}
