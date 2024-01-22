"use client"
import Navigation from '../components/Navigation';
import HeaderSection from '../components/HeaderSection';
import Footer from '../components/Footer';
import { Inter as NextInter } from 'next/font/google';
import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { isValidElement, cloneElement } from "react";

export default function FrontLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
          <div className="flex flex-col justify-between min-h-screen">
            <Navigation  /> 
            {children}
            <Footer />
          </div>
  

  </div>
  )}
