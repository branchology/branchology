import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faBible,
  faBirthdayCake,
  faBook,
  faBookOpen,
  faCalendar,
  faCat,
  faChild,
  faCircle,
  faCloudMoon,
  faGhost,
  faKey,
  faPencilAlt,
  faPlusCircle,
  faRing,
  faSearch,
  faSpinner,
  faSquare,
  faStickyNote,
  faTimes,
  faTrash,
  faUserAstronaut,
  faUserGraduate,
  faUserMd,
  faUserNinja,
} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import styledMap from 'styled-map';

library.add(
  faBible,
  faBirthdayCake,
  faBook,
  faBookOpen,
  faCalendar,
  faCat,
  faChild,
  faCircle,
  faCloudMoon,
  faGhost,
  faKey,
  faPencilAlt,
  faPlusCircle,
  faRing,
  faSearch,
  faSpinner,
  faSquare,
  faStickyNote,
  faTimes,
  faTrash,
  faUserAstronaut,
  faUserGraduate,
  faUserMd,
  faUserNinja,
);

const danger = '#dd3245';
const primary = '#0077fa';
const success = '#22A94D';

const colorMap = styledMap`
  danger: ${danger};
  primary: ${primary};
  success: ${success};
  disabled: #e2e2e2;
  default: #222;
`;

const sizeMap = styledMap`
  xs: 0.5em;
  default: 1em;
`;

const IconContainer = styled.span`
  color: ${colorMap};
  font-size: ${sizeMap};
`;

export const Icon = ({ icon, color, spin, transform, ...props }) => (
  <IconContainer {...props}>
    <FontAwesomeIcon
      icon={Array.isArray(icon) ? icon : ['fas', icon]}
      style={{ fontWeight: 300 }}
      color={color}
      spin={spin}
      transform={transform}
    />
  </IconContainer>
);
