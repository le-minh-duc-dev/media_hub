import React from 'react'

export default function Topics() {
  return (
    <div>
         <Tabs aria-label="Dynamic tabs" items={artistTopics} isVertical>
            {(topic) => (
              <Tab key={topic._id as string} title={topic.name}>
                <div className="grid grid-cols-5 gap-4">
                  {girlsPerTopic[topic._id as string].map((girl) => (
                    <GirlItem girl={girl} key={girl._id as string} />
                  ))}
                </div>
              </Tab>
            )}
          </Tabs>
    </div>
  )
}
