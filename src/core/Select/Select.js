import styles from './Select.less'
import cx from 'classnames'

export default class Select extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      dropdownOpen: false,
      selection: this.props.selection,
      options: this.props.options,
      children: this.props.children
    }

    // bind functions once
    this.onEsc = this.onEsc.bind(this)
    this.onClose = this.onClose.bind(this)
    this.setSelection = this.setSelection.bind(this)
    this.toggleDropdown = this.toggleDropdown.bind(this)
    this.handleFilterKeyUp = this.handleFilterKeyUp.bind(this)
  }
  componentDidMount() {
    document.addEventListener('click', this.onClose)
    document.addEventListener('keyup', this.onEsc)
  }
  componentWillUnmount() {
    document.removeEventListener('click', this.onClose)
    document.removeEventListener('keyup', this.onEsc)
  }
  componentWillReceiveProps(nextProps) {
    // For users that provide their own children options
    // we have to listen for prop changes to determine
    // if the internal selection state needs to change
    if (nextProps.selection !== this.state.selection) {
      this.setState({
        selection: nextProps.selection
      })
    }
  }
  
  renderFilter() {
    if (
      (this.props.children && this.props.children.length > 50) ||
      (this.props.options && this.props.options.length > 50)
    ) {
      return (
        <Search
          className="filter"
          placeholder="Enter a term to filter this list"
          onKeyUp={this.handleFilterKeyUp}
        />
      )
    }
    return null
  }

  toggleDropdown(evt) {
    if (evt.target.closest('.filter')) {
      return false
    }

    const body = document.querySelector('#bodySection')
    const content = document.querySelector('#contentView')

    if (body && content) {
      const contentHeight = content.getHeight()
      const selectorPosition = this.selector.getPosition()
      const filter = this.selector.querySelector('.filter')
      const selections = this.selector.querySelector('.selections')
      const initialSelectionsHeight = selections.offsetHeight
      const scrollOffset = body.scrollTop

      if (initialSelectionsHeight < contentHeight) {
        if (initialSelectionsHeight + selectorPosition.y > contentHeight) {
          // If we can adjust the dropdown height to fit in the
          // available content space, subtracting the footer 50px height
          let newHeight = Math.floor(contentHeight - selectorPosition.y) - 50
          if (newHeight > 200 && newHeight < 600) {
            // The options list controls the overflow scrolling
            // so we have to adjust it's height
            selections.querySelector('.options').style.height = newHeight + 'px'
          } else {
            selections.style.top = '-' + initialSelectionsHeight + 'px'
          }
        }
      }

      if (filter) {
        filter.querySelector('input').focus()
      }
    }

    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    })
  }

  setSelection(evt) {
    if (this.props.onSelect) {
      this.props.onSelect(evt)
    }

    this.setState({
      selection: this.props.options.find(opt => {
        return opt.value == evt.currentTarget.dataset.value
      })
    })
  }

  handleFilterKeyUp(evt) {
    let value = evt.target.value.trim().toLowerCase()

    if (value) {
      if (this.props.children) {
        this.setState({
          children: this.props.children.filter(opt => {
            return opt.props.html.toLowerCase().indexOf(value) !== -1
          })
        })
      } else {
        this.setState({
          options: this.props.options.filter(opt => {
            return opt.html.toLowerCase().indexOf(value) !== -1
          })
        })
      }
    } else {
      this.setState({
        options: this.props.options,
        children: this.props.children
      })
    }
  }

  onEsc(evt) {
    if (evt.which == 27) {
      this.setState({
        dropdownOpen: false
      })
    }
  }

  onClose(evt) {
    const parent = evt.target.closest('.selector')

    // Close this select if the click occured
    // outside a ZestySelect or this instance
    if (!parent || parent !== this.selector) {
      this.setState({ dropdownOpen: false })
    }
  }

  render() {
    let opts = {
      className: cx(
        'selector',
        styles.selector,
        this.state.dropdownOpen ? styles.show : styles.hidden
      ),
      onClick: this.toggleDropdown
    }
    return (
      <div {...opts} ref={div => (this.selector = div)}>
        <input
          type="hidden"
          name={this.props.name}
          value={this.state.selection.value}
        />
        <span className={styles.selection}>
          <i
            className={cx(
              'icon icon-chevron-right',
              styles.chevron,
              styles['icon-chevron-right']
            )}
          />
          <i
            className={cx(
              'icon icon-chevron-down',
              styles.chevron,
              styles['icon-chevron-down']
            )}
          />

          {this.state.selection.html ? (
            <span
              className={styles.content}
              dangerouslySetInnerHTML={{
                __html: this.state.selection.html
              }}
            />
          ) : (
            <span className={styles.content}>{this.state.selection.text}</span>
          )}
        </span>
        <ul className={'selections ' + styles.selections}>
          {this.renderFilter()}
          <div className={styles.options}>
            {this.state.children
              ? this.state.children
              : this.state.options.map(opt => {
                  return (
                    <Option
                      key={opt.value}
                      value={opt.value}
                      text={opt.text}
                      html={opt.html}
                      onClick={this.setSelection}
                    />
                  )
                })}
          </div>
        </ul>
      </div>
    )
  }
}

export const Option = ({ value, html, text, onClick }) => {
  if (html) {
    return (
      <li
        data-value={value}
        onClick={onClick}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    )
  } else {
    return (
      <li data-value={value} onClick={onClick}>
        {text}
      </li>
    )
  }
}
