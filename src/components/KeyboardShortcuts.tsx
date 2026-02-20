"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function KeyboardShortcuts() {
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // SAFETY CHECK: Do nothing if the user is currently typing in an input or textarea
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      // Ensure the 'Shift' key is held down to prevent accidental triggering
      if (!e.shiftKey) return;

      // Map keys to specific routes
      switch (e.key.toLowerCase()) {
        case "h":
          e.preventDefault();
          router.push("/");
          break;
        case "m":
          e.preventDefault();
          router.push("/user/map");
          break;
        case "p":
          e.preventDefault();
          router.push("/protocol");
          break;
        case "l":
          e.preventDefault();
          router.push("/admin/login"); // Or your AuthPage route
          break;
        case "u":
          e.preventDefault();
          router.push("/user/profile");
          break;
        case "d":
          e.preventDefault();
          router.push("/admin/dashboard");
          break;
          case "a":
          e.preventDefault();
          router.push("/about");
          break;
        default:
          break;
      }
    };

    // Attach the event listener to the window
    window.addEventListener("keydown", handleKeyDown);

    // Clean up the listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [router]);

  return null; // This component renders absolutely nothing visually
}   