import Button from './Button'
import ButtonGroup from './ButtonGroup'
import Url from './Url'
import AppLink from './AppLink'
import Loader from './Loader'
import Search from './Search'
import Select from './Select'
import { Option } from './Select'
import Input from './Input'
import Infotip from './Infotip'

// We expose these modules on the global scope
// since legacy code(read: outside of a bundle)
// depend on these components.
window.Button = Button
window.ButtonGroup = ButtonGroup
window.Url = Url
window.AppLink = AppLink
window.Loader = Loader
window.Search = Search
window.Select = Select
window.Option = Option
window.Infotip = Infotip
window.Input = Input
