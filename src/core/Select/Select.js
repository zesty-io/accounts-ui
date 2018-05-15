import styles from './Select.less'
import cx from 'classnames'

export class Select extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      dropdownOpen: false,
      selection: props.selection || props.children[0].props || {},
      children: this.flattenChildren(props.children)
    }
  }
  componentDidMount() {
    document.addEventListener('click', this.onClose)
    document.addEventListener('keyup', this.onEsc)
  }
  componentWillUnmount() {
    document.removeEventListener('click', this.onClose)
    document.removeEventListener('keyup', this.onEsc)
  }

  componentWillUpdate(props, state) {
    console.log('Select Update', props, state)
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
              'fa fa-chevron-right',
              styles.chevron,
              styles['icon-chevron-right']
            )}
          />
          <i
            className={cx(
              'fa fa-chevron-down',
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
          {this.props.children && this.props.children.length > 50 ? (
            <Search
              className="filter"
              placeholder="Enter a term to filter this list"
              onKeyUp={this.handleFilterKeyUp}
            />
          ) : null}
          <div className={styles.options}>
            {this.state.children.map(child => {
              return React.cloneElement(child, {
                onClick: evt => {
                  // Individual option event listener
                  if (child.props.onClick) {
                    child.props.onClick(evt)
                  }
                  this.setSelection(evt)
                }
              })
            })}
          </div>
        </ul>
      </div>
    )
  }

  toggleDropdown = evt => {
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

  setSelection = evt => {
    // Top level Select event listener
    if (this.props.onSelect) {
      this.props.onSelect(evt)
    }

    const selected = this.state.children.find(child => {
      return child.props.value == evt.currentTarget.dataset.value
    })

    this.setState({
      selection: selected.props
    })
  }

  handleFilterKeyUp = evt => {
    let value = evt.target.value.trim().toLowerCase()

    if (value) {
      this.setState({
        children: this.state.children.filter(child => {
          return (
            child.props.html.toLowerCase().indexOf(value) !== -1 ||
            child.props.text.toLowerCase().indexOf(value) !== -1
          )
        })
      })
    } else {
      // Reset select to default options
      this.setState({
        children: this.flattenChildren(this.props.children)
      })
    }
  }

  /*
  Flatten react child components
   */
  flattenChildren = children => {
    return children.reduce((acc, child) => {
      if (Array.isArray(child)) {
        acc = [...acc, ...child]
      } else {
        acc.push(child)
      }
      return acc
    }, [])
  }

  onEsc = evt => {
    if (evt.which == 27) {
      this.setState({
        dropdownOpen: false
      })
    }
  }

  onClose = evt => {
    const parent = evt.target.closest('.selector')

    // Close this select if the click occured
    // outside a ZestySelect or this instance
    if (!parent || parent !== this.selector) {
      this.setState({ dropdownOpen: false })
    }
  }
}

export function Option({ value, html, text, onClick }) {
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
