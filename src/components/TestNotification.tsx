import { useEffect } from "react";
import { notification } from "antd";

export default function TestNotification() {
  useEffect(() => {
    notification.info({
      message: "Test Notification",
      description: "If you see this, notification works.",
    });
  }, []);

  return <div>Test Notification Component</div>;
}
