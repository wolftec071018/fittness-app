import React,{ useState, useEffect} from "react";
import UserCard from '../trainer/userCard';

import SearchService from '../../services/search.service';
import TrainerService from '../../services/trainer.service';

import TrainerSidebar from './trainerSidebar'
import TopNavbar from "./topNavbarTW";


var DATA_LOADED = false;

function TrainerHome() {

  const [athletes, setAthletes] = useState([]);
  const [city, setCity] = useState();

  useEffect(() => {
    async function fetchData() {
      const res = await TrainerService.getAthletes();
      setAthletes(res.data);
      DATA_LOADED = true;
    }
    if (!DATA_LOADED) {
      fetchData().then(() => console.log("data loaded"));
    }
  }, [athletes]);

  function handleSearch(ev) {
      ev.preventDefault();
      if (city) {
          SearchService.searchAthlete(city).then(
              res => {
                  console.log(res.data);
              },
              err => {
                  window.alert("Server error" + err.message);
              }
          );
      }
  }

  return (
    <div>
    <TopNavbar/>
        <div className={'flex'}>
           
            <TrainerSidebar />
          <div className = "ml-56">
            <div className={'col-12'}>
              <form onSubmit={handleSearch}>
                  <div className="input-group my-3 max-w-52">
                      <input type="text" className="form-control" placeholder="Athlete search by city"
                             onChange={(ev) => setCity(ev.target.value)}
                             aria-label="athlete search by city" aria-describedby="button-addon2" />
                          <div className="input-group-append">
                              <button className="btn btn-outline-secondary" type="submit" id="button-addon2">
                                  Button
                              </button>
                          </div>
                  </div>

              </form>
              <div>
                <row>
                  {athletes.map((athlete) => (
                    <UserCard athlete={athlete} key={athlete._id} />
                  ))}
                </row>
              </div>
            </div>
            </div>
      </div>
      </div>
  );
}

export default TrainerHome;
