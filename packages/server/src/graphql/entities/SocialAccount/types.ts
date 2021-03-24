import { registerEnumType } from "type-graphql";
import { StrategyType } from "../../../auth";

registerEnumType(StrategyType, {
    name: "StrategyType"
});
