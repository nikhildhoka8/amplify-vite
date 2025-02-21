import { Authenticator, Flex, Button, View, SwitchField } from "@aws-amplify/ui-react";
import { AIConversation } from "@aws-amplify/ui-react-ai";
import { useAIConversation } from "./client";
import { useState } from "react";

export default function App() {
  const [voiceMode, setVoiceMode] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  
  const [
    {
      data: { messages },
      isLoading,
    },
    handleSendMessage,
  ] = useAIConversation("chat");

  const toggleVoiceMode = () => {
    setVoiceMode(!voiceMode);
    // Reset transcript visibility when turning voice mode off
    if (voiceMode) {
      setShowTranscript(false);
    }
    // Simulating voice input/output for now
    if (!voiceMode) {
      setTimeout(() => {
        // Simulate voice response
        const utterance = new SpeechSynthesisUtterance("Hello! I can hear you.");
        window.speechSynthesis.speak(utterance);
      }, 2000);
    }
  };

  return (
    <Authenticator>
      <Flex direction="column" alignItems="center" padding="1rem">
        <Flex direction="column" width="100%" gap="1rem">
          <SwitchField
            label="Voice Mode"
            labelPosition="start"
            isChecked={voiceMode}
            onChange={toggleVoiceMode}
          />

          {voiceMode && (
            <View
              backgroundColor="blue"
              borderRadius="50%"
              width="20px"
              height="20px"
              style={{
                animation: "pulse 2s infinite",
              }}
            />
          )}

          {voiceMode && (
            <Button
              variation="link"
              onClick={() => setShowTranscript(!showTranscript)}
            >
              {showTranscript ? "Hide Transcript" : "Show Transcript"}
            </Button>
          )}

          {(!voiceMode || (voiceMode && showTranscript)) && (
            <AIConversation
              messages={messages}
              isLoading={isLoading}
              handleSendMessage={handleSendMessage}
            />
          )}
        </Flex>
      </Flex>
    </Authenticator>
  );
}

// Add this CSS to your styles
const styles = `
@keyframes pulse {
  0% {
    transform: scale(1) translate(0, 0);
  }
  50% {
    transform: scale(1.2) translate(10px, 10px);
  }
  100% {
    transform: scale(1) translate(0, 0);
  }
}
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
