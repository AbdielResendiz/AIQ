import React from "react";

import LottieView from "lottie-react-native";

export default class LottieAirplane extends React.Component {
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
          height: 180,
        }}
        source={require("../../../../assets/animations/loginairplane.json")}
      />
    );
  }
}