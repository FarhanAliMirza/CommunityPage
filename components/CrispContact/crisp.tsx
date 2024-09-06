import React, { Component } from "react";

import { Crisp } from "crisp-sdk-web";

class CrispChat extends Component {
  componentDidMount() {
    Crisp.configure("3df3b395-c634-412d-bd94-4e82e74aee36");
  }

  render() {
    return null;
  }
}
export default CrispChat;
