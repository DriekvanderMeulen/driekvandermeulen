import Timeline, {
  TimelineItem,
  TimelineItemDate,
  TimelineItemTitle,
  TimelineItemDescription
} from "@/registry/8starlabs-ui/blocks/timeline";

const timelineData = [
  {
    title: "Project Kickoff",
    description:
      "Initial meeting with stakeholders to define the roadmap and core requirements.",
    date: new Date("2023-01-01"),
    variant: "outline" as const
  },
  {
    title: "Research Phase",
    description:
      "Conducted user interviews and competitive analysis to refine the feature set.",
    date: new Date("2023-01-15"),
    variant: "outline" as const
  },
  {
    title: "Prototype Approval",
    description:
      "Client signed off on the high-fidelity designs and interactive prototype.",
    date: new Date("2023-02-01"),
    variant: "outline" as const
  },
  {
    title: "Unexpected API Delays",
    description:
      "Third-party integration is taking longer than expected due to rate limiting issues.",
    date: new Date("2023-02-10"),
    variant: "outline" as const
  },
  {
    title: "Critical Database Failure",
    description:
      "Data corruption occurred during migration. rollback procedures initiated immediately.",
    date: new Date("2023-02-14"),
    variant: "outline" as const
  },
  {
    title: "Beta Launch",
    description:
      "System stabilized and released to the first batch of 500 internal users.",
    date: new Date("2023-03-01"),
    variant: "outline" as const
  }
];

export default function TimelineNoCardsDemo() {
  return (
    <Timeline orientation="horizontal" noCards>
      {timelineData.map((item, idx) => (
        <TimelineItem
          key={idx}
          variant={item.variant}
          className="text-center p-1"
        >
          <TimelineItemDate>{item.date.toDateString()}</TimelineItemDate>
          <TimelineItemTitle>{item.title}</TimelineItemTitle>
          <TimelineItemDescription>{item.description}</TimelineItemDescription>
        </TimelineItem>
      ))}
    </Timeline>
  );
}
