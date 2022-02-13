import React from 'react'
import FeaturedPost from '../components/FeaturedPost'
import PostCard from '../components/PostCard'
import "./styles/signedinhome.css"

function SignedInHome() {
  return (
    <section className='posts-section'>
        <FeaturedPost />
        <div className='posts'>
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        </div>
    </section>
  )
}

export default SignedInHome