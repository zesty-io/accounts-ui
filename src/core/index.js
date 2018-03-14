import Button from './button'
import ButtonGroup from './button-group'
import Url from './url'
import Loader from './loader'
import Search from './search'
import Select from './select'
import Input from './input'
import {Option} from './select'
import Infotip from './infotip'

// We expose these modules on the global scope
// since legacy code(read: outside of a bundle)
// depend on these components.
window.Button = Button
window.ButtonGroup = ButtonGroup
window.Url = Url
window.Loader = Loader
window.Search = Search
window.Select = Select
window.Option = Option
window.Infotip = Infotip
window.Input = Input