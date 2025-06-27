// 個別importでTree Shakingを有効化
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import SearchIcon from '@mui/icons-material/Search';
import StarIcon from '@mui/icons-material/Star';

// 使用されるアイコンのみをマッピング
const iconMap = {
  AccountCircle: AccountCircleIcon,
  Add: AddIcon,
  ArrowBack: ArrowBackIcon,
  Bookmark: BookmarkIcon,
  Close: CloseIcon,
  Favorite: FavoriteIcon,
  FavoriteBorder: FavoriteBorderIcon,
  Home: HomeIcon,
  Menu: MenuIcon,
  MoreVert: MoreVertIcon,
  NavigateNext: NavigateNextIcon,
  Search: SearchIcon,
  Star: StarIcon,
} as const;

type Props = {
  color: string;
  height: number;
  type: keyof typeof iconMap;
  width: number;
};

export const SvgIcon: React.FC<Props> = ({ color, height, type, width }) => {
  const Icon = iconMap[type];
  return <Icon style={{ color, height, width }} />;
};
