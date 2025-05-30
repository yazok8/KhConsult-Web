import prisma from '@/lib/prisma';
import React from 'react'
import TeamForm from '../../_components/TeamForm';

interface EditTeamProps {
  params: Promise<{ id: string }>; // Adjusted type to Promise
}


export default async function EditTeam({params}:EditTeamProps) {

  const resolvedParams = await params; 

  const {id} = await resolvedParams;

  const team = await prisma.aboutOurTeam.findUnique({where:{id}});

  if(!team){
    return <div>Team not found</div>
  }

  return (<div className='pl-12'>
    <TeamForm team={team} />
  </div>

  )
}
