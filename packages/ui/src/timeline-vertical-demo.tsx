import Timeline, {
  TimelineItem,
  TimelineItemDate,
  TimelineItemTitle
} from "@/registry/8starlabs-ui/blocks/timeline";

const timelineData = [
  {
    title: "Project Kickoff",
    date: new Date("2023-01-01"),
    variant: "default" as const
  },
  {
    title: "Research Phase",
    date: new Date("2023-01-15"),
    variant: "secondary" as const
  },
  {
    title: "Prototype Approval",
    date: new Date("2023-02-01"),
    variant: "outline" as const
  },
  {
    title: "Unexpected API Delays",
    date: new Date("2023-02-10"),
    variant: "destructive" as const
  },
  {
    title: "Critical Database Failure",
    date: new Date("2023-02-14"),
    variant: "destructive" as const
  },
  {
    title: "Beta Launch",
    date: new Date("2023-03-01"),
    variant: "default" as const
  }
];

export default function TimelineVerticalDemo() {
  return (
    <Timeline orientation="vertical" noCards vertItemSpacing={60}>
      {timelineData.map((item, idx) => (
        <TimelineItem key={idx} variant={item.variant}>
          <TimelineItemDate>{item.date.toDateString()}</TimelineItemDate>
          <TimelineItemTitle>{item.title}</TimelineItemTitle>
        </TimelineItem>
      ))}
    </Timeline>
  );
}
