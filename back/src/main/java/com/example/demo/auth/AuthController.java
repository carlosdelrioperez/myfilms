package com.example.demo.auth;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.user.User;
import com.example.demo.user.UserRepository;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final UserRepository userRepository;

    @PostMapping(value = "login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request, HttpServletResponse response) {
        AuthResponse authResponse = authService.login(request); // suponemos que devuelve JWT en authResponse.getToken()
        String token = authResponse.getToken();

        if (token == null || token.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new AuthResponse("Usuario o contraseña incorrectos"));
        }

        // 2️⃣ Crear cookie HttpOnly
        Cookie cookie = new Cookie("token", token);
        cookie.setHttpOnly(true);       // protege contra JS/XSS
        cookie.setSecure(false);        // true si usas HTTPS en producción
        cookie.setPath("/");            // cookie disponible en todas las rutas
        cookie.setMaxAge(24 * 60 * 60); // 1 día

        response.addCookie(cookie);

        // 3️⃣ Devolver mensaje opcional (podemos limpiar el token del body)
        authResponse.setToken(token); // opcional: no enviar token en body
        return ResponseEntity.ok(authResponse);
    }

    @PostMapping(value = "register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request, HttpServletResponse response) {
        Optional<User> existingUser = userRepository.findByUsername(request.getUsername());

        if (existingUser.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(new AuthResponse("El username " + request.getUsername() + " ya está registrado."));
        }

        // Registrar usuario y obtener token
        AuthResponse authResponse = authService.register(request);
        String token = authResponse.getToken();
        // Crear cookie
        Cookie cookie = new Cookie("token", token);
        cookie.setHttpOnly(true);       // protege contra JS
        cookie.setSecure(false);        // true si usas HTTPS
        cookie.setPath("/");            // cookie disponible en todas las rutas
        cookie.setMaxAge(24 * 60 * 60); // duración 1 día
        response.addCookie(cookie);     // añadir cookie a la respuesta
        // Devolver body opcionalmente
        authResponse.setToken(null); // opcional, no enviar token en body
        return ResponseEntity.ok(authResponse);

    }

}
