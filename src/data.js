
export const userColumns = [
    { field: '_id', headerName: 'ID', width: 90 },
    {
        field: 'firstName',
        headerName: 'First name',
        width: 180,
        renderCell: (params) => {
            return (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div
                        style={{
                            height: '40px',
                            width: '40px',
                            borderRadius: '50%',
                            overflow: 'hidden',
                            marginRight: '10px',
                        }}
                    >
                        <img
                            style={{
                                height: '100%',
                                width: '100%',
                                objectFit: 'contain',
                            }}
                            src={
                                params.row.img
                                    ? params.row.img
                                    : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
                            }
                            alt="avatar"
                        />
                    </div>
                    {params.row.firstName === ''
                        ? 'No info'
                        : params.row.firstName}
                </div>
            )
        },
    },
    {
        field: 'lastName',
        headerName: 'Last name',
        width: 190,
        renderCell: (params) => {
            return (
                <>
                    {params.row.lastName === ''
                        ? 'No info'
                        : params.row.lastName}
                </>
            )
        },
    },
    {
        field: 'birthDate',
        headerName: 'Age',
        type: 'number',
        headerAlign: 'left',
        align: 'left',
        width: 90,
        renderCell: (params) => {
            const date = new Date()
            const dateOfBirth = new Date(params.row.birthDate)
            const age = Math.abs(date.getFullYear() - dateOfBirth.getFullYear())
            return <>{isNaN(age) ? 'No info' : age}</>
        },
    },
    {
        field: 'email',
        headerName: 'Email',
        width: 200,
    },
]

export const userRows = [
    {
        id: 1,
        lastName: 'Snow',
        firstName: 'Jon',
        age: 35,
        email: 'info@gmail.com',
        img: 'https://minimaltoolkit.com/images/randomdata/female/49.jpg',
    },
    {
        id: 2,
        lastName: 'Lannister',
        firstName: 'Cersei',
        age: 42,
        email: 'info@gmail.com',
        img: 'https://minimaltoolkit.com/images/randomdata/female/49.jpg',
    },
    {
        id: 3,
        lastName: 'Lannister',
        firstName: 'Jaime',
        age: 45,
        email: 'info@gmail.com',
        img: 'https://minimaltoolkit.com/images/randomdata/female/49.jpg',
    },
    {
        id: 4,
        lastName: 'Stark',
        firstName: 'Arya',
        age: 16,
        email: 'info@gmail.com',
        img: 'https://minimaltoolkit.com/images/randomdata/female/49.jpg',
    },
    {
        id: 5,
        lastName: 'Targaryen',
        firstName: 'Daenerys',
        age: 23,
        email: 'info@gmail.com',
        img: 'https://minimaltoolkit.com/images/randomdata/female/49.jpg',
    },
    {
        id: 6,
        lastName: 'Melisandre',
        firstName: 'Raynolds',
        age: 150,
        email: 'info@gmail.com',
        img: 'https://minimaltoolkit.com/images/randomdata/female/49.jpg',
    },
    {
        id: 7,
        lastName: 'Clifford',
        firstName: 'Ferrara',
        age: 44,
        email: 'info@gmail.com',
        img: 'https://minimaltoolkit.com/images/randomdata/female/49.jpg',
    },
    {
        id: 8,
        lastName: 'Frances',
        firstName: 'Rossini',
        age: 36,
        email: 'info@gmail.com',
        img: 'https://minimaltoolkit.com/images/randomdata/female/49.jpg',
    },
    {
        id: 9,
        lastName: 'Roxie',
        firstName: 'Harvey',
        age: 65,
        email: 'info@gmail.com',
        img: 'https://minimaltoolkit.com/images/randomdata/female/49.jpg',
    },
    {
        id: 10,
        lastName: 'Kelvin',
        firstName: 'James',
        age: 65,
        email: 'info@gmail.com',
        img: 'https://minimaltoolkit.com/images/randomdata/female/49.jpg',
    },
    {
        id: 11,
        lastName: 'Kelvin',
        firstName: 'James',
        age: 65,
        email: 'info@gmail.com',
        img: 'https://minimaltoolkit.com/images/randomdata/female/49.jpg',
    },
    {
        id: 12,
        lastName: 'Kelvin',
        firstName: 'James',
        age: 65,
        email: 'info@gmail.com',
        img: 'https://minimaltoolkit.com/images/randomdata/female/49.jpg',
    },
]

export const userInputs = [
    {
        id: 1,
        title: 'Name and surname',
        placeholder: 'John Doe',
        type: 'text',
    },
    {
        id: 2,
        title: 'Phone',
        placeholder: '+1 234 567 89',
        type: 'text',
    },
    {
        id: 3,
        title: 'Adress',
        placeholder: 'Washington st. 216 San Diego',
        type: 'text',
    },
    {
        id: 4,
        title: 'Username',
        placeholder: 'john_doe',
        type: 'text',
    },
    {
        id: 5,
        title: 'Email',
        placeholder: 'john_doe@gmail.com',
        type: 'email',
    },
    {
        id: 6,
        title: 'Password',
        type: 'password',
    },
    {
        id: 7,
        title: 'Country',
        placeholder: 'USA',
        type: 'text',
    },
]
export const brands = [
    {
        id: 1,
        img: 'https://www2.hm.com/hm-logo.png',
        name: 'H&M',
    },
    {
        id: 2,
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Pull%26Bear_logo.svg/1200px-Pull%26Bear_logo.svg.png',
        name: 'Pull & Bear',
    },
    {
        id: 3,
        img: 'https://cdn.dsmcdn.com/mnresize/200/200/marketing/datascience/Automation/BrandBoutique/2021/4/25/20210425_15471619354871_Bershka.png',
        name: 'Bershka',
    },
    {
        id: 4,
        img: 'https://www.forumcamlik.com/media/image/11R8RW2GA33U82.png',
        name: 'Mavi',
    },
    {
        id: 5,
        img: 'https://cdn.dsmcdn.com/mnresize/200/200/marketing/datascience/Automation/BrandBoutique/2021/4/25/20210425_15511619355115_Koton.png',
        name: 'Koton',
    },
    {
        id: 6,
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Logo_of_Mango_%28new%29.svg/2560px-Logo_of_Mango_%28new%29.svg.png',
        name: 'Mango',
    },
    {
        id: 8,
        img: 'https://cdn.dsmcdn.com/mnresize/200/200/marketing/datascience/Automation/BrandBoutique/2021/4/25/20210425_15561619355397_USPoloAssn.png',
        name: 'U.S Polo Assn.',
    },
    {
        id: 9,
        img: 'https://cdn.dsmcdn.com/mnresize/200/200/marketing/datascience/Automation/BrandBoutique/2021/4/25/20210425_15521619355121_Lacoste.png',
        name: 'Lacoste',
    },
    {
        id: 10,
        img: 'https://cdn.dsmcdn.com/mnresize/200/200/marketing/datascience/automation/2022/2/28/Pierrecardin_202202282024.jpg',
        name: 'Pierre Cardin',
    },
]
