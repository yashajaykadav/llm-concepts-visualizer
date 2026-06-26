import React, { useState } from "react";
import { wordClusters, presetComparisons } from "./mockEmbeddingsData";
import { HelpCircle, Database } from "lucide-react";

export default function EmbeddingsModule() {

  const [selectedPair, setSelectedPair] = useState(
    presetComparisons[0]
  );

  const [highlightedCluster, setHighlightedCluster] = useState(null);


  const clusterColors = {
    Royalty:
      "bg-pink-500/10 text-pink-400 border-pink-500/30",

    Technology:
      "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",

    Nature:
      "bg-green-500/10 text-green-400 border-green-500/30",
  };


  return (

    <div className="max-w-6xl mx-auto space-y-8 px-4">


      <div>

        <h1 className="text-3xl font-bold text-white flex items-center gap-3">

          <Database className="text-indigo-400"/>

          Module 2: Vector Embeddings

        </h1>


        <p className="text-slate-400 mt-3">

          Embeddings convert tokens into vectors.
          Similar concepts stay closer in vector space.

        </p>

      </div>




      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">



        <div className="lg:col-span-2 space-y-6">


          <div className="bg-slate-950 border border-slate-800 rounded-xl p-6">


            <h3 className="text-slate-300 font-semibold mb-4">

              2D Vector Space Map

            </h3>




            <div
              className="
              relative
              h-[380px]
              bg-slate-900
              rounded-lg
              border
              border-slate-800
              overflow-hidden
              "
            >



              <div
                className="
                absolute inset-0
                grid grid-cols-10 grid-rows-10
                opacity-10
                "
              >

                {
                  Array.from({length:100}).map((_,i)=>(

                    <div
                      key={i}
                      className="border border-slate-700"
                    />

                  ))
                }

              </div>





              {
              Object.entries(wordClusters).map(
              ([cluster,points])=>


                points.map((pt,index)=>{


                  const isDimmed =
                    highlightedCluster &&
                    highlightedCluster !== cluster;



                  return (

                  <div

                  key={`${cluster}-${index}`}


                  style={{

                    left:`${pt.x * 10}%`,

                    bottom:`${pt.y * 10}%`

                  }}


                  className={`
                  
                  absolute

                  -translate-x-1/2
                  -translate-y-1/2

                  px-3
                  py-1.5

                  rounded-lg

                  text-xs

                  font-mono

                  border

                  whitespace-nowrap

                  transition-all

                  duration-300


                  ${clusterColors[cluster]}


                  ${
                    isDimmed
                    ?
                    "opacity-20 scale-90"

                    :

                    "opacity-100 scale-100 shadow-lg"
                  }

                  `}

                  >

                  ● {pt.word}

                  </div>

                  )


                })


              )}






            </div>






            <div className="flex flex-wrap gap-3 mt-5">


              {
              Object.keys(wordClusters).map(cluster=>(


                <button

                key={cluster}


                onClick={()=>setHighlightedCluster(
                  highlightedCluster===cluster
                  ? null
                  : cluster
                )}


                className={`
                px-3
                py-1
                rounded-md
                text-xs
                border

                ${clusterColors[cluster]}

                `}

                >

                {cluster}

                </button>


              ))

              }



            </div>



          </div>







          <div className="bg-slate-950 border border-slate-800 rounded-xl p-6">


            <h3 className="text-slate-300 font-semibold mb-4">

              Semantic Similarity Experiment

            </h3>



            <div className="grid md:grid-cols-2 gap-5">



              <div className="space-y-2">


              {
              presetComparisons.map((item,index)=>(


                <button

                key={index}

                onClick={()=>setSelectedPair(item)}


                className={`
                
                w-full
                text-left
                p-3
                rounded-lg
                border
                transition


                ${
                  selectedPair.pair===item.pair

                  ?

                  "bg-indigo-600/20 border-indigo-400 text-white"

                  :

                  "bg-slate-900 border-slate-800 text-slate-400"

                }

                `}

                >

                {item.pair}


                </button>


              ))

              }



              </div>






              <div className="bg-slate-900 border border-slate-800 rounded-lg p-5">


                <span className="text-xs text-slate-500">

                Similarity Score

                </span>


                <div className="text-4xl font-bold text-indigo-400 mt-2">

                {selectedPair.similarity}%

                </div>


                <p className="text-sm text-slate-400 mt-3">

                {selectedPair.desc}

                </p>




                <div className="h-3 bg-slate-800 rounded-full mt-5 overflow-hidden">


                  <div

                  className="
                  h-full
                  bg-gradient-to-r
                  from-indigo-500
                  to-cyan-400
                  transition-all
                  "

                  style={{

                    width:`${selectedPair.similarity}%`

                  }}

                  />


                </div>



              </div>



            </div>


          </div>



        </div>






        <div
        className="
        bg-slate-950
        border
        border-slate-800
        rounded-xl
        p-6
        flex
        flex-col
        justify-between
        "
        >


          <div>


            <h3 className="text-white flex items-center gap-2 font-semibold">

              <HelpCircle className="text-cyan-400"/>

              Concept

            </h3>



            <ul className="mt-5 space-y-3 text-sm text-slate-400 list-disc list-inside">


              <li>
              Real embeddings contain thousands of dimensions.
              </li>


              <li>
              Similar meanings create nearby vectors.
              </li>


              <li>
              LLMs compare vector relationships mathematically.
              </li>


            </ul>


          </div>



          <div className="
          mt-6
          p-4
          rounded-lg
          bg-cyan-950/30
          border
          border-cyan-900
          text-sm
          text-cyan-300
          ">


          <strong className="text-white">

          Math Insight:

          </strong>


          <p className="mt-2">

          Cosine similarity measures angle distance between vectors.

          </p>


          </div>



        </div>



      </div>



    </div>

  );

}