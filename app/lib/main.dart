import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:webview_flutter/webview_flutter.dart';
import 'package:permission_handler/permission_handler.dart';
import 'dart:convert';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  SystemChrome.setPreferredOrientations([DeviceOrientation.portraitUp]);
  runApp(const VajraApp());
}

class VajraApp extends StatelessWidget {
  const VajraApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Advaya FM NaipuNya',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(
          seedColor: Colors.deepPurple,
          brightness: Brightness.dark,
        ),
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
      ..setBackgroundColor(const Color(0xFF0D1117))
      ..setNavigationDelegate(
        NavigationDelegate(
          onProgress: (int progress) {
            debugPrint('WebView loading: $progress%');
          },
          onPageFinished: (String url) {
            debugPrint('Page loaded: $url');
            setState(() { _isLoading = false; });
          },
          onWebResourceError: (WebResourceError error) {
            debugPrint('WebView error: ${error.description} (${error.errorCode})');
          },
        ),
      )
      ..setOnConsoleMessage((JavaScriptConsoleMessage message) {
        debugPrint('JS: ${message.message}');
      })
      ..addJavaScriptChannel(
        'AdvayaEngine',
        onMessageReceived: (JavaScriptMessage message) {
          _handleEngineMessage(message.message);
        },
      );

    _loadLocalContent();
  }

  Future<void> _loadLocalContent() async {
    try {
      _controller.loadFlutterAsset('assets/webxr/index.html');
    } catch (e) {
      debugPrint('Failed to load WebXR: $e');
    }
  }

  void _handleEngineMessage(String message) {
    debugPrint('[Engine] $message');

    // Handle structured messages (PHASE_CHANGE, MODULE_COMPLETE, QUIZ_RESULT, etc.)
    if (message.startsWith('MODULE_COMPLETE:')) {
      final moduleId = message.split(':')[1];
      _showSnack('Module $moduleId Completed!', Colors.green);
    } else if (message.startsWith('QUIZ_RESULT:')) {
      final parts = message.split(':');
      final score = parts.length > 2 ? parts[2] : '?';
      final status = parts.length > 3 ? parts[3] : '';
      _showSnack('Quiz Score: $score% - $status', status == 'PASS' ? Colors.green : Colors.orange);
    } else if (message.startsWith('PHASE_CHANGE:')) {
      debugPrint('[Phase] $message');
    } else if (message.startsWith('MODULE_START:')) {
      debugPrint('[Start] $message');
    } else if (message.contains('SECURE') || message.contains('COMPLIANT')) {
      _showSnack('Verification: $message', Colors.green);
    }

    // Try JSON parsing for structured messages
    try {
      final data = jsonDecode(message);
      if (data['type'] == 'OTP_REQUEST') {
        _triggerMSG91(data['payload']);
      }
    } catch (_) {}
  }

  void _showSnack(String text, Color color) {
    if (!mounted) return;
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(text, style: const TextStyle(fontWeight: FontWeight.bold)),
        backgroundColor: color,
        duration: const Duration(seconds: 2),
      ),
    );
  }

  Future<void> _triggerMSG91(dynamic payload) async {
    debugPrint('MSG91 OTP trigger: $payload');
  }

  Future<bool> _onWillPop() async {
    if (!_isLoading) {
      final shouldPop = await showDialog<bool>(
        context: context,
        builder: (ctx) => AlertDialog(
          title: const Text('Exit Training?'),
          content: const Text('Your progress will be saved. Are you sure you want to exit?'),
          actions: [
            TextButton(onPressed: () => Navigator.of(ctx).pop(false), child: const Text('CONTINUE')),
            TextButton(onPressed: () => Navigator.of(ctx).pop(true), child: const Text('EXIT')),
          ],
        ),
      );
      return shouldPop ?? false;
    }
    return true;
  }

  @override
  Widget build(BuildContext context) {
    return PopScope(
      canPop: false,
      onPopInvoked: (didPop) async {
        if (didPop) return;
        final shouldPop = await _onWillPop();
        if (shouldPop && context.mounted) {
          Navigator.of(context).pop();
        }
      },
      child: Scaffold(
        backgroundColor: const Color(0xFF0D1117),
        body: SafeArea(
          child: Stack(
            children: [
              WebViewWidget(controller: _controller),
              if (_isLoading)
                const Center(
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      CircularProgressIndicator(color: Colors.amber),
                      SizedBox(height: 16),
                      Text('Loading NaipuNya...', style: TextStyle(color: Colors.white70, fontSize: 14)),
                    ],
                  ),
                ),
            ],
          ),
        ),
      ),
    );
  }
}
