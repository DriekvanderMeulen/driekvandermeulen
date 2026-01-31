import { TransportBadge } from "@/registry/8starlabs-ui/blocks/transport-badge";

export default function TransportBadgeDemoStationName() {
  return (
    <div className="flex flex-col gap-3">
      <TransportBadge
        system="SG"
        stationCode="NS1"
        stationName="Jurong East"
        showStationName
      />
      <TransportBadge
        system="SG"
        stationCode="NE12"
        stationName="Serangoon"
        showStationName
      />
      <TransportBadge
        system="SG"
        stationCode={["NS27", "CE15"]}
        stationName="Marina Bay"
        showStationName
      />
      <TransportBadge
        system="SG"
        stationCode="DT1"
        stationName="Bukit Panjang"
        showStationName
      />
    </div>
  );
}
