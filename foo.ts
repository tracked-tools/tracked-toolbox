import Component from "@glimmer/component";
import { dedupeTracked, localCopy, trackedReset } from ".";

export default class Foo extends Component<{
  breakfast: boolean;
  timeOfDay: number;
}> {
  @dedupeTracked someData = 0;

  @localCopy((component: Foo, key, prev: "potato" | "waffles") => {
    return prev === "potato" && component.args.breakfast ? prev : "waffles";
  })
  blah = "neato";

  @localCopy<Foo>("args.whatUp") potato = "hello";

  @localCopy<Foo>("args.breakfast") myBreakfast = true;

  @localCopy<Foo>("blah") bar = true;

  @trackedReset<Foo>("args.breakfast") cool = "yeah";

  @trackedReset<Foo, number>({
    memo: "potato",
    update: (component, key, last: number) =>
      component.args.timeOfDay < 12 ? last + 1 : last,
  })
  heyo = 0;
}

type X = AllNestedPropsOf<Foo>;
