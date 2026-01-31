import { TransportBadge } from "@/registry/8starlabs-ui/blocks/transport-badge";

export default function TransportBadgeDemoMultiStation() {
  return (
    <div className="flex flex-col gap-3">
      <TransportBadge system="SG" stationCode={["NS1", "EW24"]} />
      <TransportBadge system="SG" stationCode={["NS27", "CE15"]} />
      <TransportBadge system="SG" stationCode={["DT14", "CE10"]} />
      <TransportBadge system="SG" stationCode={["NS1", "DT24", "TE12"]} />
    </div>
  );
}
