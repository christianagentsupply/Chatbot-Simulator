import { BrowserRouter as Router, Routes, Route, useSearchParams } from 'react-router-dom';
import WhatsAppChat from './components/WhatsAppChat';
import InstagramChat from './components/InstagramChat';
import MessengerChat from './components/MessengerChat';
import WebsiteChatMock from './components/WebsiteChatMock';

const ChatRouter = () => {
  const [searchParams] = useSearchParams();
  const client = searchParams.get('client');
  const platform = searchParams.get('platform');

  // Render appropriate chat component based on platform
  switch (platform) {
    case 'whatsapp':
      return <WhatsAppChat client={client} />;
    case 'instagram':
      return <InstagramChat client={client} />;
    case 'messenger':
      return <MessengerChat client={client} />;
    case 'web':
      return <WebsiteChatMock client={client} />;
    default:
      return <NotFoundPage />;
  }
};

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center p-4">
      <div className="max-w-md mx-auto text-center">
        <div className="w-24 h-24 bg-red-100 rounded-full mx-auto mb-6 flex items-center justify-center">
          <svg className="w-12 h-12 text-red-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">404 - Platform Not Found</h1>
        <p className="text-gray-600 mb-6">
          The requested platform is not supported. Please use one of the following platforms:
        </p>
        <div className="space-y-2 text-left bg-white p-4 rounded-lg shadow-md">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Supported platforms:</span>
          </p>
          <ul className="text-sm text-gray-600 space-y-1 ml-4">
            <li>• whatsapp</li>
            <li>• instagram</li>
            <li>• messenger</li>
            <li>• web</li>
          </ul>
        </div>
        <div className="mt-6 text-sm text-gray-500">
          <p>Example URL format:</p>
          <code className="bg-gray-100 px-2 py-1 rounded text-xs">
            demo.agentsupply.ai/clientname?platform=whatsapp
          </code>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChatRouter />} />
        <Route path="*" element={<ChatRouter />} />
      </Routes>
    </Router>
  );
}

export default App;
