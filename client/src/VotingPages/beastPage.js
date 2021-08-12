import React from "react";

//don't know what it do
//code won't work without this
//nim delete mat kar dena

// import img1 from 'assets/images/users/1.jpg';
// import img2 from 'assets/images/users/2.jpg';
// import img3 from 'assets/images/users/3.jpg';
// import img4 from 'assets/images/users/4.jpg';

import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Input,
  Table,
} from "reactstrap";

const Projects = () => {
  return (
    /*--------------------------------------------------------------------------------*/
    /* Used In Dashboard-4 [General]                                                  */
    /*--------------------------------------------------------------------------------*/

    <Card>
      <CardBody>
        <div className="d-flex align-items-center">
          <div>
            <CardTitle>Projects of the Month</CardTitle>
            <CardSubtitle>Overview of Latest Month</CardSubtitle>
          </div>
          <div className="ml-auto d-flex no-block align-items-center">
            <div className="dl">
              <Input type="select" className="custom-select">
                <option value="0">Monthly</option>
                <option value="1">Daily</option>
                <option value="2">Weekly</option>
                <option value="3">Yearly</option>
              </Input>
            </div>
          </div>
        </div>
        <Table className="no-wrap v-middle" responsive>
          <thead>
            <tr className="border-0">
              <th className="border-0">Team Lead</th>
              <th className="border-0">Project</th>

              <th className="border-0">Status</th>
              <th className="border-0">Weeks</th>
              <th className="border-0">Budget</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className="d-flex no-block align-items-center">
                  <div className="mr-2">
                    <img
                      src={
                        "https://i.ibb.co/9rbkKC2/venkatesh-ji-seminar-1.jpg"
                      }
                      alt="user"
                      className="rounded-circle"
                      width="45"
                    />
                  </div>
                  <div className="">
                    <h5 className="mb-0 font-16 font-medium">Hanna Gover</h5>
                    <span>hgover@gmail.com</span>
                  </div>
                </div>
              </td>
              <td>Elite Admin</td>

              <td>
                <i className="fa fa-circle text-orange" id="tlp1"></i>
              </td>
              <td>35</td>
              <td className="blue-grey-text  text-darken-4 font-medium">
                $96K
              </td>
            </tr>
            <tr>
              <td>
                <div className="d-flex no-block align-items-center">
                  <div className="mr-2">
                    <img
                      src={
                        "https://i.ibb.co/9rbkKC2/venkatesh-ji-seminar-1.jpg"
                      }
                      alt="user"
                      className="rounded-circle"
                      width="45"
                    />
                  </div>
                  <div className="">
                    <h5 className="mb-0 font-16 font-medium">
                      Daniel Kristeen
                    </h5>
                    <span>Kristeen@gmail.com</span>
                  </div>
                </div>
              </td>
              <td>Elite Admin</td>

              <td>
                <i className="fa fa-circle text-success" id="tlp2"></i>
              </td>
              <td>35</td>
              <td className="blue-grey-text  text-darken-4 font-medium">
                $96K
              </td>
            </tr>
            <tr>
              <td>
                <div className="d-flex no-block align-items-center">
                  <div className="mr-2">
                    <img
                      src={
                        "https://i.ibb.co/9rbkKC2/venkatesh-ji-seminar-1.jpg"
                      }
                      alt="user"
                      className="rounded-circle"
                      width="45"
                    />
                  </div>
                  <div className="">
                    <h5 className="mb-0 font-16 font-medium">Julian Josephs</h5>
                    <span>Josephs@gmail.com</span>
                  </div>
                </div>
              </td>
              <td>Elite Admin</td>

              <td>
                <i className="fa fa-circle text-success" id="tlp3"></i>
              </td>
              <td>35</td>
              <td className="blue-grey-text  text-darken-4 font-medium">
                $96K
              </td>
            </tr>
            <tr>
              <td>
                <div className="d-flex no-block align-items-center">
                  <div className="mr-2">
                    <img
                      src={
                        "https://i.ibb.co/9rbkKC2/venkatesh-ji-seminar-1.jpg"
                      }
                      alt="user"
                      className="rounded-circle"
                      width="45"
                    />
                  </div>
                  <div className="">
                    <h5 className="mb-0 font-16 font-medium">Jan Petrovic</h5>
                    <span>hgover@gmail.com</span>
                  </div>
                </div>
              </td>
              <td>Elite Admin</td>

              <td>
                <i className="fa fa-circle text-orange" id="tlp4"></i>
              </td>
              <td>35</td>
              <td className="blue-grey-text  text-darken-4 font-medium">
                $96K
              </td>
            </tr>
          </tbody>
        </Table>
      </CardBody>
    </Card>
  );
};

export default Projects;

// export default function votes() {

//     const data = [
//         {
//             url:'https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.pmindia.gov.in%2Fwp-content%2Fuploads%2F2021%2F12%2FThumbnail-Pm-New-Photo.jpg&imgrefurl=https%3A%2F%2Fwww.pmindia.gov.in%2Fen%2Fnews-updates%2F&tbnid=P0uRNGsZq_pvnM&vet=12ahUKEwj217Tw4KHwAhXGNCsKHeXoDV8QMygJegUIARDiAQ..i&docid=r5eKaDNRMQUmqM&w=800&h=498&q=modi%20image&ved=2ahUKEwj217Tw4KHwAhXGNCsKHeXoDV8QMygJegUIARDiAQ',
//             name:'Narendra Modi',
//             party:'BJP',
//             age:'Sweet 16',

//         },
//         {
//             url:'https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.pmindia.gov.in%2Fwp-content%2Fuploads%2F2021%2F12%2FThumbnail-Pm-New-Photo.jpg&imgrefurl=https%3A%2F%2Fwww.pmindia.gov.in%2Fen%2Fnews-updates%2F&tbnid=P0uRNGsZq_pvnM&vet=12ahUKEwj217Tw4KHwAhXGNCsKHeXoDV8QMygJegUIARDiAQ..i&docid=r5eKaDNRMQUmqM&w=800&h=498&q=modi%20image&ved=2ahUKEwj217Tw4KHwAhXGNCsKHeXoDV8QMygJegUIARDiAQ',
//             name:'Narendra Modi',
//             party:'BJP',
//             age:'Sweet 16',

//         },
//         {
//             url:'https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.pmindia.gov.in%2Fwp-content%2Fuploads%2F2021%2F12%2FThumbnail-Pm-New-Photo.jpg&imgrefurl=https%3A%2F%2Fwww.pmindia.gov.in%2Fen%2Fnews-updates%2F&tbnid=P0uRNGsZq_pvnM&vet=12ahUKEwj217Tw4KHwAhXGNCsKHeXoDV8QMygJegUIARDiAQ..i&docid=r5eKaDNRMQUmqM&w=800&h=498&q=modi%20image&ved=2ahUKEwj217Tw4KHwAhXGNCsKHeXoDV8QMygJegUIARDiAQ',
//             name:'Narendra Modi',
//             party:'BJP',
//             age:'Sweet 16',

//         }
//     ];

//     return (
//         <div>
//         {data.map((details) => (
//             <tr>
//             <td>
//                 <div className="d-flex no-block align-items-center">
//                     <div className="mr-2"><img src={details.url} alt="user" className="rounded-circle" width="45" /></div>
//                     <div className="">
//                         <h5 className="mb-0 font-16 font-medium">{details.name}</h5><span>hgover@gmail.com</span></div>
//                 </div>
//             </td>
//             <td>{details.party}</td>

//             <td>
//                 <i className="fa fa-circle text-orange" id="tlp1"></i>

//             </td>
//             <td>{details.age}</td>
//             <td className="blue-grey-text  text-darken-4 font-medium">$96K</td>
//         </tr>
//         ))}
//         </div>
//     );
// }
