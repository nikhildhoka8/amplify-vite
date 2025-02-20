import { Authenticator, Flex, Button } from "@aws-amplify/ui-react";
import { AIConversation } from "@aws-amplify/ui-react-ai";
import { useAIConversation } from "./client";

export default function App() {
  const [
    {
      data: { messages },
      isLoading,
    },
    handleSendMessage,
  ] = useAIConversation("chat");

  return (
    <Authenticator>
      <Flex direction="column" alignItems="center" padding="1rem">
        {/* Container for aligning button and input */}
        <Flex direction="row" alignItems="center" gap="1rem" width="100%">
          <Button
            size="small"
            loadingText=""
            onClick={() => alert("Voice Mode Activated")}
          >
            Voice Mode
          </Button>
          <AIConversation
            messages={messages}
            isLoading={isLoading}
            handleSendMessage={handleSendMessage}
                 />
        </Flex>
      </Flex>
    </Authenticator>
  );
}
