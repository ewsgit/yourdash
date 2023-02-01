import { useEffect, useState } from 'react';
import ColContainer from 'ui/backup/containers/ColContainer/ColContainer';
import RowContainer from 'ui/backup/containers/RowContainer/RowContainer';
import CardButton from 'ui/backup/elements/cardButton/CardButton';
import Icon from 'ui/icon/Icon';
import AppLayout from '../../../layouts/appLayout/AppLayout';
import { NextPageWithLayout } from '../../page';
import TasksLayout from './components/TasksLayout';
import styles from "./index.module.scss"
import SERVER, { verifyAndReturnJson } from '../../../server';
import IconButton from 'ui/backup/elements/iconButton/IconButton';
import Button from 'ui/backup/elements/button/Button';
import Card from 'ui/backup/containers/card/Card';
import { useRouter } from 'next/navigation';

function LoadPersonalLists(setPersonalLists: (_value: { name: string, id: string }[]) => void) {
  verifyAndReturnJson(
      SERVER.get(`/tasks/personal/lists`),
      data => {
        setPersonalLists(data.lists || [])
      },
      () => {
        console.error(`unable to fetch the user's personal lists`)
      }
  )
}

const TasksIndex: NextPageWithLayout = () => {
  const router = useRouter()

  const [ personalLists, setPersonalLists ] = useState(null as { name: string, id: string }[] | null)

  useEffect(() => {
    LoadPersonalLists(lists => {return setPersonalLists(lists)})
  }, [])

  if (personalLists === null) return <></>

  return (
    <ColContainer>
      <RowContainer className={ styles.title }>
        <Icon name='yourdash-logo' useDefaultColor/>
        <h1>Tasks</h1>
      </RowContainer>
      <section className={ styles.section }>
        <section className={ styles.sectionHeader }>
          <h3>Personal lists</h3>
          <IconButton
            onClick={ () => {
                  verifyAndReturnJson(
                      SERVER.post("/tasks/personal/list/create", { body: "" }),
                      () => {
                        LoadPersonalLists(lists => {return setPersonalLists(lists)})
                      },
                      () => {
                        console.error("unable to create a new list")
                      }
                  )
                } }
            icon="plus-16"
          />
        </section>
        <ColContainer>
          {
              personalLists.length !== 0 ?
                  personalLists.map((list, ind) => {return (
                    <CardButton
                      className={ styles.list }
                      key={ ind }
                      onClick={ () => {
                            router.push(`/app/tasks/personal/list/${list.id}`)
                          } }
                    >
                      <span>{list.name}</span>
                      <IconButton
                        onClick={ e => {
                              e.stopPropagation()
                              verifyAndReturnJson(
                                  SERVER.delete(`/tasks/personal/list/delete/${list.id}`),
                                  () => {
                                    LoadPersonalLists(lists => {return setPersonalLists(lists)})
                                  },
                                  () => {
                                    console.error(`unable to delete list`)
                                  }
                              )
                            } }
                        icon="trash-16"
                      />
                    </CardButton>
                  )})
                  : (
                    <Card className={ styles.message }>
                      <ColContainer>
                        <h2>
                          Oh no!
                        </h2>
                        <p>
                          You have no personal lists :(
                        </p>
                        <Button
                          onClick={ () => {
                                verifyAndReturnJson(
                                    SERVER.post("/tasks/personal/list/create", { body: "" }),
                                    () => {
                                      LoadPersonalLists(lists => {return setPersonalLists(lists)})
                                    },
                                    () => {
                                      console.error("unable to create a new list")
                                    }
                                )
                              } }
                          vibrant
                        >
                          Create a list
                        </Button>
                      </ColContainer>
                    </Card>
                  )
            }
        </ColContainer>
      </section>
      {/* <section className={styles.section}>
        <h3>Organizations</h3>
        <ColContainer>
          {
            [
              {
                icon: "",
                name: "test",
              },
              {
                icon: "",
                name: "test",
              },
              {
                icon: "",
                name: "test",
              },
              {
                icon: "",
                name: "test",
              }
            ].map((org, ind) => {
              return <CardButton key={ind} onClick={() => {
                console.log(`Implement Me!!!`)
              }}>
                <row>
                  <img src={org.icon} alt="" />
                  <span>{org.name}</span>
                </row>
              </CardButton>
            })
          }
        </ColContainer>
      </section> */}
    </ColContainer>
  );
};

export default TasksIndex;

TasksIndex.getLayout = page => {return (
  <AppLayout>
    <TasksLayout>
      {page}
    </TasksLayout>
  </AppLayout>
)}
