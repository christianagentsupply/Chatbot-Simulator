import { useParams } from 'react-router-dom';

const businessConfigs = {
  liamoon: {
    websiteUrl: 'https://www.liamoon.com/',
    chatbotEmbed: `<iframe src=\"https://app.agentsupply.ai/en/chatbot/embed/4f93f2a7-e897-4bba-b604-e57ac481c500?position=right\" width=\"320\" height=\"600\" frameborder=\"0\" allow='microphone'></iframe>`,
    chatbotScript: `<script src=\"https://app.agentsupply.ai/static/chatbot/js/chatbubble.js\" data-id=\"4f93f2a7-e897-4bba-b604-e57ac481c500\" data-domain=\"https://app.agentsupply.ai\" data-position=\"right\"></script>`
  },
  // Add more businesses here
};

const WebsiteChatMock = ({ client }) => {
  const { business } = useParams();
  const config = businessConfigs[business?.toLowerCase()] || {};
  const { websiteUrl, chatbotEmbed, chatbotScript } = config;

  if (!websiteUrl) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center text-gray-500">No website configured for this business.</div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen relative overflow-hidden">
      {/* Website as background */}
      <iframe
        src={websiteUrl}
        title={`${client} Website`}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 0, border: 'none' }}
      />
      {/* Chatbot embed */}
      <div className="absolute bottom-0 right-0 z-50">
        <div dangerouslySetInnerHTML={{ __html: chatbotEmbed }} />
        {/* The script tag must be added to the DOM, not just as innerHTML, for most bots. */}
        {/* If the script doesn't work, you may need to add it in public/index.html or useEffect. */}
      </div>
    </div>
  );
};

export default WebsiteChatMock;