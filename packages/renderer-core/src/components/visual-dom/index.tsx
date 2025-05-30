import { adapter } from '../../adapter'
import type { IGeneralConstructor } from '../../types'
import PropTypes from 'prop-types'

export function visualDomFactory(): IGeneralConstructor {
  const { PureComponent, createElement } = adapter.getRuntime()
  return class VisualDom extends PureComponent {
    static displayName = 'VisualDom'

    static propTypes = {
      children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.arrayOf(PropTypes.element),
      ]),
    }

    static defaultProps = {
      children: null,
    }

    render() {
      const { children, cell, title, label, text, __componentName } = this.props
      let mainContent = children
      if (cell && typeof cell === 'function') {
        mainContent = cell()
      }
      return createElement(
        'div',
        { className: 'visual-dom' },
        createElement('div', { className: 'panel-container' }, [
          createElement(
            'span',
            { className: 'title' },
            title || label || text || __componentName,
          ),
          createElement('div', { className: 'content' }, mainContent),
        ]),
      )
    }
  } as IGeneralConstructor
}
