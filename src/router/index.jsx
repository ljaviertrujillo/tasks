import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import LayoutPublic from '../pages/LayoutPublic';
import LayoutPrivate from '../pages/LayoutPrivate';
import Projects from '../pages/Projects';
import Project from '../pages/Project';
import Tasks from '../pages/Tasks';
import Login from '../pages/Login';
import Signup from '../pages/SignUp';
import NotFound from '../pages/NotFound'

//icons
import {MdSpaceDashboard, MdOutlineHome, MdOutlineFolderOpen, MdSettings, MdOutlinePowerSettingsNew} from 'react-icons/md'
import { TbLayoutBoard } from 'react-icons/tb'
import { RiTeamLine } from 'react-icons/ri'
import { CgProfile } from 'react-icons/cg'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <LayoutPublic />,
        errorElement: <NotFound />,
        children: [
            {
                errorElement: <NotFound />,
                children: [
                    {
                        path: '/login',
                        element: <Login />
                    },
                    {
                        path: '/signup',
                        element: <Signup />
                    }
            ]
            }
        ]

    },
    {
        element: <LayoutPrivate />,
        errorElement: <NotFound />,
        children: [
            {
                errorElement:<NotFound />,
                children: [
                    {
                        index: true,
                        element: <Home />,
                    },
                    {
                        path:'/projects',
                        element: <Projects />,
                        children: [
                            {
                                path: '/projects/:id',
                                element: <Project />
                            }
                        ]
                    },
                    {
                        path: '/tasks',
                        element: <Tasks />,
                    },

                ]
            }
        ]
    }

])

export const features = [
    {
      id: '1',
      icon: MdOutlineHome,
      label: 'Home',
      url: '/',
      subMenuIcon: false
    },
    {
      id: '3',
      icon: MdOutlineFolderOpen,
      label: 'Projects',
      url: '/projects',
      subMenuIcon: true 
    },
    {
      id: '4',
      icon: TbLayoutBoard,
      label: 'Tasks',
      url: '/tasks',
      subMenuIcon: true
    },
  ]

export const card = {
  id: 'card01',
  displayName: 'Javier Trujillo',
  photoUrl: '',
  url: '/profile',
  label: 'Profile',
  icon: CgProfile
}

export const logout = {
  label: 'Log Out',
  icon: MdOutlinePowerSettingsNew
}