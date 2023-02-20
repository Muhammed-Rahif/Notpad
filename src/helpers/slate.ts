import { Node } from "slate";

export const serialize = (nodes: any[]) => {
  return nodes.map((n: Node) => Node.string(n)).join("\n");
};
