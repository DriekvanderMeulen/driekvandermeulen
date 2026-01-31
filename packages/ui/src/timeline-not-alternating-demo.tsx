import Timeline, {
  TimelineItem,
  TimelineItemTitle
} from "@/registry/8starlabs-ui/blocks/timeline";

const timelineData = [
  {
    title: "Project Kickoff",
    variant: "default" as const
  },
  {
    title: "Research Phase",
    variant: "secondary" as const
  },
  {
    title: "Prototype Approval",
    variant: "default" as const
  },
  {
    title: "Unexpected API Delays",
    variant: "secondary" as const
  },
  {
    title: "Critical Database Failure",
    variant: "default" as const
  },
  {
    title: "Beta Launch",
    variant: "secondary" as const
  }
];

export default function TimelineNoCardsDemo() {
  return (
    <Timeline
      orientation="horizontal"
      alternating={false}
      alignment="bottom/right"
      horizItemSpacing={180}
      horizItemWidth={150}
    >
      {timelineData.map((item, idx) => (
        <TimelineItem key={idx} variant={item.variant} className="text-center">
          <TimelineItemTitle>{item.title}</TimelineItemTitle>
        </TimelineItem>
      ))}
    </Timeline>
  );
}
