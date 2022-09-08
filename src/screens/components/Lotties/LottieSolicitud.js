import React from "react";

import LottieView from "lottie-react-native";

export default class LottieSolitcitud extends React.Component {
  componentDidMount() {
    this.animation.play();
  }

  render() {
    return (
      <LottieView
        ref={(animation) => {
          this.animation = animation;
        }}
        style={{
          width: '100%',
          height: 600,
        }}
        source={require("../../../../assets/animations/solicitud1.json")}
      />
    );
  }
}
