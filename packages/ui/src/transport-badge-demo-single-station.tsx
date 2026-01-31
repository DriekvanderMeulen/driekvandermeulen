import { TransportBadge } from "@/registry/8starlabs-ui/blocks/transport-badge";

export default function TransportBadgeDemoSingleStation() {
  return (
    <div className="flex flex-wrap gap-3">
      <TransportBadge system="SG" stationCode="NS1" />
      <TransportBadge system="SG" stationCode="EW12" />
      <TransportBadge system="SG" stationCode="NE6" />
      <TransportBadge system="SG" stationCode="CE4" />
      <TransportBadge system="SG" stationCode="DT15" />
      <TransportBadge system="SG" stationCode="TE9" />
    </div>
  );
}
