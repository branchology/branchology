import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faLeaf } from '@fortawesome/pro-light-svg-icons';
import {
  faBat,
  faBible,
  faBirthdayCake,
  faBookOpen,
  faCalendar,
  faCat,
  faCloudMoon,
  faGhost,
  faJackOLantern,
  faKey,
  faPencil,
  faPlusCircle,
  faRing,
  faScarecrow,
  faStickyNote,
  faTombstone,
  faTrash,
  faUserAstronaut,
  faUserGraduate,
  faUserMd,
  faUserNinja,
} from '@fortawesome/pro-solid-svg-icons';

library.add(
  faBat,
  faBible,
  faBirthdayCake,
  faBookOpen,
  faCalendar,
  faCat,
  faCloudMoon,
  faGhost,
  faJackOLantern,
  faKey,
  faLeaf,
  faPencil,
  faPlusCircle,
  faRing,
  faScarecrow,
  faStickyNote,
  faTombstone,
  faTrash,
  faUserAstronaut,
  faUserGraduate,
  faUserMd,
  faUserNinja,
);

export default ({ icon, ...props }) => (
  <FontAwesomeIcon
    icon={Array.isArray(icon) ? icon : ['fas', icon]}
    style={{ fontWeight: 300 }}
    {...props}
  />
);
