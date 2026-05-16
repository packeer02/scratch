import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpExchange;
import java.io.*;
import java.net.InetSocketAddress;
import java.nio.file.*;

public class Server {
    static final String ROOT = System.getProperty("user.dir");

    public static void main(String[] args) throws Exception {
        int port = 8080;
        HttpServer server = HttpServer.create(new InetSocketAddress(port), 0);
        server.createContext("/", new FileHandler());
        server.start();
        System.out.println("GAIN Server running at http://localhost:8080");
    }

    static class FileHandler implements HttpHandler {
        public void handle(HttpExchange ex) throws IOException {
            String path = ex.getRequestURI().getPath();
            if (path.equals("/")) path = "/index.html";
            File f = new File(ROOT + path);
            if (!f.exists() || !f.isFile()) {
                byte[] msg = "404 Not Found".getBytes();
                ex.sendResponseHeaders(404, msg.length);
                ex.getResponseBody().write(msg);
                ex.getResponseBody().close();
                return;
            }
            String ct = "text/plain";
            if (path.endsWith(".html")) ct = "text/html; charset=utf-8";
            else if (path.endsWith(".css"))  ct = "text/css";
            else if (path.endsWith(".js"))   ct = "application/javascript";
            byte[] data = Files.readAllBytes(f.toPath());
            ex.getResponseHeaders().set("Content-Type", ct);
            ex.sendResponseHeaders(200, data.length);
            ex.getResponseBody().write(data);
            ex.getResponseBody().close();
        }
    }
}
