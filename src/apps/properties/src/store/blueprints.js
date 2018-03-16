import { request } from '../../../../util/request'
import config from '../../../../shell/config'

export function blueprints(state = {}, action) {
  switch (action.type) {
    case 'GET_BLUEPRINTS':
      return { ...state, ...action.blueprints }
    default:
      return state
  }
}

export const fetchBlueprints = () => {
  return dispatch =>
    dispatch({
      type: 'GET_BLUEPRINTS',
      blueprints: [
        {
          name: 'No Blueprint',
          description:
            'This blueprint starts with no CSS, HTML, Javascript or content configurations. Good for developers that are building custom websites from scratch.',
          url:
            'https://be93523bd41e2e475e74-e4edef19ad51123442eaceed55c78461.ssl.cf2.rackcdn.com/or-zesty-blank.png'
        },
        {
          name: 'Bootstrap 3.3.5',
          description:
            'Bootstrap is the most popular HTML, CSS, and JS framework for developing responsive, mobile first projects on the web.',
          url:
            'https://be93523bd41e2e475e74-e4edef19ad51123442eaceed55c78461.ssl.cf2.rackcdn.com/or-bootstrap335-thumb.jpg'
        },
        {
          name: 'Skeleton',
          description:
            "You should use Skeleton if you're embarking on a smaller project or just don't feel like you need all the utility of larger frameworks. Skeleton only styles a handful of standard HTML elements and includes a grid, but that's often more than enough to get started.",
          url:
            'https://be93523bd41e2e475e74-e4edef19ad51123442eaceed55c78461.ssl.cf2.rackcdn.com/or-shield.png'
        }
      ]
    })
}
