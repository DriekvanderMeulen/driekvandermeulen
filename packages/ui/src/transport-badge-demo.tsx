import { TransportBadge } from "@/registry/8starlabs-ui/blocks/transport-badge";

export default function TransportBadgeDemo() {
  return (
    <div className="flex flex-col gap-4">
      <TransportBadge system="SG" stationCode="NS1" />
      <TransportBadge system="SG" stationCode={["NS1", "DT24", "TE12"]} />
      <TransportBadge system="SG" stationCode="CE12" />
      <TransportBadge
        system="SG"
        stationCode="NE12"
        stationName="Serangoon"
        showStationName
      />
      <TransportBadge system="SG" stationCode="TE12" size="xs" />
      <TransportBadge system="SG" stationCode="DT1" size="lg" />
    </div>
  );
}
