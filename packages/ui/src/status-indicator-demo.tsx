import StatusIndicator from "@/registry/8starlabs-ui/blocks/status-indicator";

export default function StatusIndicatorDemo() {
  return (
    <div className="flex flex-col gap-4">
      <StatusIndicator state="active" label="All systems operational" />
      <StatusIndicator state="down" label="Systems down" />
      <StatusIndicator state="idle" label="Systems idle" />
      <StatusIndicator state="fixing" label="Diagnosing issue, fixing" />
      <StatusIndicator state="active" label="Small size" size="sm" />
      <StatusIndicator state="fixing" label="Large size" size="lg" />
    </div>
  );
}
