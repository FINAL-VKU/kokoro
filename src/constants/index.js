import { createCampaign, dashboard, logout, payment, profile, withdraw } from '../assets';
export const navlinks = [
  {
    name: 'dashboard',
    imgUrl: dashboard,
    link: '/',
  },
  {
    name: 'campaign',
    imgUrl: createCampaign,
    link: '/exchange-package',
  },
  {
    name: 'payment',
    imgUrl: payment,
    link: '/',
    disabled: true,
  },
  {
    name: 'withdraw',
    imgUrl: withdraw,
    link: '/',
    disabled: true,
  },
  {
    name: 'profile',
    imgUrl: profile,
    link: '/profile',
  },
  {
    name: 'logout',
    imgUrl: logout,
    link: '/login',
    showLogout: true,
  },
];

export const PERMISSION = {
  USER: {
    CREATE: 1,
    READ: 2,
    UPDATE: 3,
    DELETE: 4
  },
  ARTIST: {
    CREATE: 5,
    READ: 6,
    UPDATE: 7,
    DELETE: 8,
    APPROVED_REJECT: 9
  },
  FAN_PAGE: {
    CREATE: 10,
    READ: 11,
    UPDATE: 12,
    DELETE: 13
  },
  POST: {
    CREATE: 14,
    READ: 15,
    UPDATE: 16,
    DELETE: 17
  },
  TOPIC: {
    CREATE: 18,
    READ: 19,
    UPDATE: 20,
    DELETE: 21
  },
  JOB: {
    CREATE: 22,
    READ: 23,
    UPDATE: 24,
    DELETE: 25
  },
  CHECKME: {
    CREATE: 26,
    READ: 27,
    UPDATE: 28,
    DELETE: 29
  },
  HASHTAG: {
    CREATE: 30,
    READ: 31,
    UPDATE: 32,
    DELETE: 33
  },
  CATEGORY_TYPE: {
    CREATE: 34,
    READ: 35,
    UPDATE: 36,
    DELETE: 37
  },
  REPORT: {
    READ: 38,
    APPROVE_REJECT: 39,
  },
  HEALTH_CARE: {
    CREATE: 40,
    READ: 41,
    UPDATE: 42,
    DELETE: 43
  },
  NOTIFY: {
    CREATE: 44,
    READ: 45,
    UPDATE: 46,
    DELETE: 47
  }
};

export const ARTIST_STATUS = {
  REQUEST: 1,
  REJECT: 2,
  APPROVE: 3
};

export const RANGE_DATE = {
  TODAY: 1,
  WEEK: 2,
  MONTH: 3
}

export const CONTENT_TYPE = {
  COMMENT: 1,
  POST: 2,
  VIDEO: 3,
  PODCAST: 4,
  COMMENT_ARTICLE: 5
};

export const STATUS = {
  PENDING: -1,
  REJECT: 1,
  APPROVE: 2
}

export const GROUP_REASON = {
  SUICIDE: 1,
  NAKED: 2,
  LANGUAGE: 3,
  TERRORISM: 4,
  SPAM: 5,
  FAKE_INFORMATION: 6,
}

export const ARTICLE_TYPES = {
  FREE: 1,
  CHARGE_COST: 2
}

export const STATUS_CHECK = {
  ACTIVE: 1,
  INACTIVE: 2
}

export const CATEGORY_TYPE = {
  ALL: -1,
  ARTIST: 1,
  ARTICLE: 2,
  EVENT: 3,
  FORUM: 4
}

export const USER_TYPE = {
  USER: 1,
  ARTIST: 2
}

export const NOTIFICATION_TYPE = {
  SPLASH_POPUP: 1
}
