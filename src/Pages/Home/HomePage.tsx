import { SearchBar } from '../../Components/SearchBar';
import AddIcon from '@mui/icons-material/Add'
import { useNavigate } from 'react-router-dom';

export default function HomePage(): JSX.Element {

  const navigate = useNavigate();

  const handleAdd = () => {
    navigate('/add');
  }

  return (
    <section className='bg-white' >

      <section className='flex justify-center gap-2 my-2'>
        <SearchBar />  
        <button onClick={handleAdd} className='fixed bottom-5 z-20 right-5 w-fit bg-blue-500 px-1.5 py-1.5 text-white font-extrabold text-lg rounded-full hover:bg-blue-800 shadow-xl transition-all'>
          <AddIcon fontSize='large'/>
        </button>    
      </section>
    </section>
  );
}