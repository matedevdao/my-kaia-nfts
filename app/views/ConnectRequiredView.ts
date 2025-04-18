import { BodyNode, el, View } from "@commonmodule/app";

export default class ConnectRequiredView extends View {
  constructor() {
    super();
    this.container = el(".connect-required-view").appendTo(BodyNode);
  }
}
