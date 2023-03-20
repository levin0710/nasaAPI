import './BanBar.css'
const BanBar = ({ banned, unbanItem}) => {

    return (
      <div className="sideNav">
        <h2>BanList</h2>
        <h4>Select dates that you want to ban</h4>
        {banned && banned.length > 0 ? (
            banned.map((ban, index) => (
                <button onClick={() => unbanItem(index)} className='banned-button'>{ban}</button>
              ) 
            )
        ) : (
            <div>
            <h3>You haven't banned anything yet!</h3>
            </div>
        )}  
      </div>
    );
  };
  
  export default BanBar;