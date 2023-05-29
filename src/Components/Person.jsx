import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPerson, getCredits } from './api/functions';
import Layout from '../Layout/Layout';
import List from './ListContainer';
import './Person.css';



const Person = (props) => {

    const { id } = useParams();

    const [person, setPerson] = useState(null);
    const [credit, setCredit] = useState(null);

    const GetPerson = async () => {
        await getPerson(id).then((res) => {
            setPerson(res);
            console.log(res);
        })
    }
    const GetCredits = async () => {
        await getCredits(id).then((res) => {
            setCredit(res);
            console.log(res);
        })
    }

    useEffect(() => {
        GetPerson();
        GetCredits();
    }, [id])




    return (
        <Layout>
            <div className="full_page">
                <div className='person_page'>
                    <div className='person'>
                        <div className="person_image">
                            <img src={`https://image.tmdb.org/t/p/original${person?.profile_path}`} alt="" />
                        </div>
                        <div className='person_info'>
                            <div>
                                <div>
                                    Known For:
                                </div>
                                {person?.known_for_department}
                            </div>
                            <div>
                                <div>
                                    Birthday:
                                </div>
                                {person?.birthday}
                            </div>
                            <div>
                                <div>
                                    Place of Birth:
                                </div>
                                {person?.place_of_birth}
                            </div>
                        </div>
                    </div>
                    <div className='info'>
                    <div>
                                <h2>{person?.name}</h2>
                            </div>

                        <div>
                            {
                                person?.biography && <h2>Biography</h2>
                            }
                            <p>{person?.biography}</p>
                        </div>
                        <div>
                            <h2>Known For</h2>
                            {
                                credit?.cast?.length > credit?.crew?.length ?
                                    <div className='listContainer'>
                                        {
                                            credit?.cast?.length > 0 && credit.cast.map((item) => {
                                                return (
                                                    <List title={item.title || item.name} id={item.id} poster={item.poster_path} type={item.media_type} />
                                                )
                                            })
                                        }
                                    </div>
                                    :
                                    <div className='listContainer'>
                                        {
                                            credit?.crew?.length > 0 && credit.crew.map((item) => {
                                                return (
                                                    <List title={item.title || item.name} id={item.id} poster={item.poster_path} type={item.media_type} />
                                                )
                                            })
                                        }
                                    </div>
                            }
                        </div>

                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Person;