import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:flutter/services.dart' show rootBundle;
import 'dart:convert';
// import 'package:http/http.dart' as http; // For MSG91 (Placeholder logic implemented)

void main() {
  runApp(const VajraApp());
}

class VajraApp extends StatelessWidget {
  const VajraApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Advaya FM Elite',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true,
      ),
      home: const VajraShell(),
    );
  }
}

class VajraShell extends StatefulWidget {
  const VajraShell({super.key});

  @override
  State<VajraShell> createState() => _VajraShellState();
}

class _VajraShellState extends State<VajraShell> {
  late final WebViewController _controller;
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _requestPermissions();
    _initWebView();
  }

  Future<void> _requestPermissions() async {
    await [
      Permission.camera,
      Permission.microphone,
    ].request();
  }

  void _initWebView() {
    _controller = WebViewController()
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..setBackgroundColor(const Color(0x00000000))
      ..setNavigationDelegate(
        NavigationDelegate(
          onPageFinished: (String url) {
            setState(() {
              _isLoading = false;
            });
          },
          onWebResourceError: (WebResourceError error) {
            debugPrint('XR Error: ${error.description}');
          },
        ),
      )
      ..addJavaScriptChannel(
        'AdvayaEngine',
        onMessageReceived: (JavaScriptMessage message) {
          _handleEngineMessage(message.message);
        },
      );
      
    _loadLocalContent();
  }

  Future<void> _loadLocalContent() async {
    // Determine the path to the local index.html asset
    // For production/release, we load from assets using a specialized server or direct HTML string
    // Here we load the string for simplicity in the "Shell"
    try {
      String htmlContent = await rootBundle.loadString('assets/webxr/index.html');
      
      // Inject local JS files (modules.js, grooming.js, module_4.js) content manually or rely on relative paths if supported
      // WebViewController loadHtmlString doesn't support relative paths for scripts easily without base URL
      // So we will serve it or assume standard asset loading.
      // For this pilot, loading via localhost server is best, but we'll try direct load.
      
      _controller.loadFlutterAsset('assets/webxr/index.html'); 
    } catch (e) {
      debugPrint('Failed to load WebXR: $e');
    }
  }

  void _handleEngineMessage(String message) {
    debugPrint("Vajra Message: $message");
    try {
      final data = jsonDecode(message);
      if (data['type'] == 'OTP_REQUEST') {
        _triggerMSG91(data['payload']);
      } else if (data['type'] == 'MODULE_COMPLETE') {
         ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Module Complete: ${data['id']}')),
        );
      }
    } catch (e) {
       // Simple string message
       if (message == 'M4_COMPLETE') {
         ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Vajra Guard (M4) Passed!')),
        );
       }
    }
  }

  Future<void> _triggerMSG91(dynamic payload) async {
    // MSG91 Implementation Stub
    debugPrint("Triggering MSG91 OTP for: $payload");
    // await http.post(...)
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      body: SafeArea(
        child: Stack(
          children: [
            WebViewWidget(controller: _controller),
            if (_isLoading)
              const Center(child: CircularProgressIndicator(color: Colors.amber)),
          ],
        ),
      ),
    );
  }
}
