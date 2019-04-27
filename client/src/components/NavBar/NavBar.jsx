import PropTypes from "prop-types";
import React, { Component } from "react";
import {
  Button,
  Container,
  Header,
  Icon,
  Menu,
  Responsive,
  Segment
} from "semantic-ui-react";
import { Link } from "react-router-dom";

// Heads up!
// We using React Static to prerender our docs with server side rendering, this is a quite simple solution.
// For more advanced usage please check Responsive docs under the "Usage" section.
const getWidth = () => {
  const isSSR = typeof window === "undefined";

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

class DesktopContainerNavBar extends Component {
  state = { activeItem: "Basic" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <Segment inverted textAlign="center" vertical color="black">
          <Menu inverted pointing secondary size="large">
            <Container>
              <Link to="/home">
                <Menu.Item
                  active={activeItem === "Basic"}
                  onClick={this.handleItemClick}
                  name="Basic"
                >
                  Basic
                </Menu.Item>
              </Link>
              <Link to="/markers">
                <Menu.Item
                  active={activeItem === "Markers"}
                  onClick={this.handleItemClick}
                  name="Markers"
                >
                  Markers
                </Menu.Item>
              </Link>
              <Link to="/popups">
                <Menu.Item
                  active={activeItem === "Popups"}
                  onClick={this.handleItemClick}
                  name="Popups"
                >
                  Popups
                </Menu.Item>
              </Link>
              <Link to="/deck">
                <Menu.Item
                  active={activeItem === "DeckGL"}
                  onClick={this.handleItemClick}
                  name="DeckGL"
                >
                  DeckGL
                </Menu.Item>
              </Link>
            </Container>
          </Menu>
        </Segment>
      </Responsive>
    );
  }
}

export default DesktopContainerNavBar;
