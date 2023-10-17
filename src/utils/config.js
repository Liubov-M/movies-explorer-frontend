import {
  DesctopScreen_cards,
  TabletScreen_cards,
  MobileScreen_cards,
  DesctopScreen_more,
  TabletScreen_more,
  MobileScreen_more,
} from './constants'

const visibleMovieCards = {
  desktop: {
    initCount: DesctopScreen_cards,
    moreCount: DesctopScreen_more,
  },
  tablet: {
    initCount: TabletScreen_cards,
    moreCount: TabletScreen_more,
  },
  mobile: {
    initCount: MobileScreen_cards,
    moreCount: MobileScreen_more,
  },
};

export default visibleMovieCards;
